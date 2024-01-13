---
layout: post
title: Paper Review 02 - AutoTables
permalink: /posts/2024-01-14-thoughts-on-autotables/
---

My thoughts on [Auto-Tables: Synthesizing Multi-Step Transformations to Relationalize Tables without Using Examples](https://arxiv.org/pdf/2307.14565.pdf)

---

Today's post is about a paper that won [VLDB 2023's best paper award](https://vldb.org/2023/?conference-awards).
It's a really cool idea, and I think it definitely tackles a problem that's very
relevant.

## What are relational tables?

Here's a definition from chatGPT:

> A relational table is a two-dimensional structure in a relational database.
> Rows represent records, each containing a unique set of data, while columns
> represent attributes shared by all rows. Cells at the intersections hold
> single data values. Tables organize and store data, with relationships
> established through keys for data integrity and efficient queries.

A briefer way I might put it is that each row models some object which may
have relationships to rows in other tables.

This means that the following table is relational:

||name|favorite color|age|
|---|---|---|---|
|0|Aneesh|Purple|25
|...|
|n|Bneesh|Green|26

But this one isn't

|Aneesh|
|Purple|
|25|
|...|
|Bneesh|
|Green|
|26|

Like the example above many real-world tables have well-defined structures, but
are not relational, or possibly not relational in a sense that they cannot
easily be queried by SQL-like languages. A very convincing example from the
paper is spreadsheets that may look like the following. Consider a spreadsheet
that tracks how many miles members of a local running club ran across the years:

||name|2020|2021|2022|2023|2024
|0|Aneesh|1|20|125|302|12
|1|Sonic|1000|1000|1000|1000|1
|...|

If I want to query for a member's total distance ran across all years, or the
average or other such queries, it's hard to express since part of the data (the
year), is stored within the column instead of within the table. Even though some
queries are expressible, it's still not ideal since the query would need to
change over time, and generating them by hand can be cumbersome. e.g. if this
was a `pandas` dataframe, I may write something like:

```python
# df is the table above

avg_miles = (df[2020] + df[2021] + df[2022] + df[2023] + df[2024]) / 5

# Or if we want to be more clever
start_year = 2020
end_year = 2025
total_years = end_year - start_year
total_miles = sum(df[x] for x in range(start_year, end_year))
avg_miles = total_miles / total_years
```

If we transform
the column names into a row, we get something much nicer:

||name|year|miles\_ran
|0|Aneesh|2020|1|
|1|Aneesh|2021|20|
|2|Aneesh|2022|125|
|3|Aneesh|2023|302|
|4|Aneesh|2023|12|
|...|

Which we can query in a much more straightforward way:

```python
df.groupby('name').mean('miles_ran')
```
Transformation between these two tables can be achieved via the `pandas.melt`
operator.

Similarly, the paper has more examples of other tables that are not relational
and provides a DSL of operations that can be used to convert non-relational
tables to relational tables.

## What is the problem that AutoTables solves?

`AutoTables` aims to synthesize programs that can transform a non-relationable
table to a relational table without any examples provided by the user. This is
done by generating sequences of operations from the DSL that they define which
has the added flexibility of allowing their system to work agnostic of the
actual table representation (e.g. pandas, traditional databases, or even
spreadsheets).

The paper claims that previous systems either require users to provide examples
of the transformation they want, which can be a tedious process. To solve this
problem, they draw inspiration from computer vision techniques to predict the
desired program.

## Computer Vision isn't just for images!

The authors note that the problem of transforming tables is very "visual".
Humans can observe patterns in the data which inform us as to what kinds of
transformations we should make to "relationalize" the table. To this end, the
authors describe a solution that converts tables into feature tensors by using a
vector encoding model across cell contents, and then also including some
additional dimensions to encode things like data type. Then, a model similar to
those used in CV categorization tasks can be trained to predict the program that
is desired. I don't know too much about the details of how CNNs work, so I can't
comment much on the architecture they went with.

While the paper describes taking in the entire table as input, it
seems to be reasonable to assume that for large tables, passing in a subset of
the rows shouldn't affect accuracy too much. However, the biggest challenge the
authors faced was in gathering sufficient training data.

## Generating training data

To train neural networks, a large amount of training data is required. While it
is probably likely that a large amount of non-relational tables can be found in
the wild, collecting them and then subsequently labelling them with the correct
program to relationalize them is a monumental effort. Instead, the authors
observed that every operation in their DSL contained an inverse. By applying
sequences of inverse operations against relational tables (which are easy to
generate), one can obtain a large corpus of non-relation tables and their
labelling programs (the inverse of applying the sequence of inverses).
Additionally, to improve the robustness of their implementations, they include a
few operations during the generation phase that do not have inverses - e.g.
dropping rows/columns (while preserving contiguous chunks of data since
contiguity may be required to infer the required relationalizing program).

## Refining results

In order to improve the accuracy of their predictions, they include an
additional step where they run part of their model over the tables that would be
generated by applying the top \\(k\\) predictions to determine which table would
score they highest for being "relational". Since this re-uses the model they
have already trained, they can boost their accuracy without much additional
training time.

## My thoughts

 - How well does this system handle unstructured data?

  One thing that wasn't clear to me from this paper was how autotables deals
  with unstructured data. If there is no possible transformation to turn the
  table into a relational form, does the system just predict programs with very
  low confidence? An interesting area to explore could be to extend the behavior
  to try to establish a structured representation losslessly. I think the number
  of unstructured datasets out there that could benefit from this is very high
  (e.g. wikipedia tables/articles usually don't have a consistent format, but
  being able to turn them into a more queriable format could enable some
  new usecases).

 - Why not use queries to guide the required transformations?

 I'm unsure how convinced I am that providing examples is prohibitively
 expensive. The users of this system will need to still write queries against
 these tables, which means they still need to understand the new table's schema.
 However, I can imagine scenarios, like in the context of LLMs, where providing
 examples might not be possible to do accurately. That being said, I wonder if
 this system could do better if it used queries that users want to run as hints
 to determining the desired transformation. I think that could be especially
 useful in the context of LLM powered applications where queries might be
 presented as natural language.

 - More details on comparision to other systems?

 I'm sure this is probably an answerable question, but I'd like to see some
 concrete examples of tables where autotables can and can't predict the correct
 program, and maybe also look at some cases where some of the systems that were
 ran for comparision was able to transform their input correctly while
 autotables couldn't. Without that info though, I'm not sure how to really
 interpret the comparision section other than to note that this problem isn't
 fully solved, but that autotables provides a pretty significant improvement.

 - For very large tables this method may not scale well (transformation time)

 This isn't related to this paper's main aim, but the transformation time/cost
 for some tables could be prohibitively expensive (particularly for tables like
 the ones the [last paper]({{ '/posts/2024-01-05-xorbits-summary/' | relative_url }}})
 were talking about). To that end, I wonder how well these programs can be
 represented as views, or if there's other ways of avoiding or amortizing the
 cost of transformation. This is something that probably requires going a level
 deeper and is specific to the backend that's actually storing the table, but it
 would be interesting to see what approaches there are for tackling this problem
 out there.


 I really liked this paper! The connection to computer vision was really cool
 and bringing techniques from neural networks to databases is a really
 interesting approach.
