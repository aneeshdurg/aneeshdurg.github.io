// Implement search functionality
function getAllPostsForMonth(month) {
  let el = month.nextElementSibling;
  const posts = [];
  while (el && el.classList.contains('post')) {
    posts.push(el);
    el = el.nextElementSibling;
  }

  return posts;
}

function getAllMonthsForYear(year) {
  let el = year.nextElementSibling;
  const months = [];
  while (el && !el.classList.contains('newyear')) {
    if (el.classList.contains('newmonth')) {
      months.push(el);
    }
    el = el.nextElementSibling;
  }

  return months;
}

function hideEmptyContainer(tag, extractor) {
  for (let el of document.getElementsByClassName(tag)) {
    const els = extractor(el);
    const visibleEls = els.filter((el) => el.style.display !== 'none');
    if (visibleEls.length === 0) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  }
}

const hideEmptyMonths = () => hideEmptyContainer('newmonth', getAllPostsForMonth);
const hideEmptyYears = () => hideEmptyContainer('newyear', getAllMonthsForYear);

function insertHighlights(text) {
  if (!text) {
    return;
  }
  for (let post of document.getElementsByClassName('post')) {
    // only if post is visible
    if (post.style.display === 'none') {
      continue;
    }
    // Insert spans highlighting text matching the input we have to do this on a
    // per-node basis because otherwise we would lose nested tags such as links
    const title = post.getElementsByTagName('h1')[0];
    const excerpt = post.getElementsByClassName('excerpt')[0];
    const nodes = [...title.childNodes, ...excerpt.childNodes];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node.nodeType === Node.TEXT_NODE) {
        let nodeContents = node.nodeValue;
        let index = nodeContents.toLowerCase().indexOf(text);
        if (index > -1) {
          const newNodes = [];
          while (index > -1) {
            const before = nodeContents.substring(0, index);
            newNodes.push(document.createTextNode(before));

            const span = document.createElement('span');
            span.className = 'searchhighlight';
            const match = nodeContents.substring(index, index + text.length);
            span.appendChild(document.createTextNode(match));
            newNodes.push(span);

            nodeContents = nodeContents.substring(index + text.length);
            index = nodeContents.toLowerCase().indexOf(text);
          }
          if (nodeContents) {
            newNodes.push(document.createTextNode(nodeContents));
          }

          node.replaceWith(...newNodes);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(...node.childNodes);
      }
    }
  }
}

function restoreHighlights() {
  // Replace span elements with the highlight class with their innerText
  const posts = document.getElementsByClassName('post');
  for (let post of posts) {
    while (post.getElementsByClassName('searchhighlight').length > 0) {
      const spans = post.getElementsByTagName('span');
      for (let span of spans) {
        const parentNode = span.parentNode;
        const textNode = document.createTextNode(span.innerText);
        parentNode.replaceChild(textNode, span);

        // Merge adjacent text nodes to enable future highlighting
        const newChildren = [];
        for (let child of parentNode.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            if (newChildren.length > 0 && newChildren[newChildren.length - 1].nodeType === Node.TEXT_NODE) {
              newChildren[newChildren.length - 1].nodeValue += child.nodeValue;
            } else {
              newChildren.push(child);
            }
          } else {
            newChildren.push(child);
          }
        }
        parentNode.replaceChildren(...newChildren);
      }
    }
  }
}

function search(text) {
  restoreHighlights();

  const posts = document.getElementsByClassName('post');
  for (let post of posts) {
    const title = post.getElementsByTagName('h1')[0].innerText.toLowerCase();
    const excerpt =
      post.getElementsByClassName('excerpt')[0].innerText.toLowerCase();
    if (title.indexOf(text) > -1 || excerpt.indexOf(text) > -1) {
      post.style.display = '';
    } else {
      post.style.display = 'none';
    }

    hideEmptyMonths();
    hideEmptyYears();
  }

  insertHighlights(text);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchbar = document.getElementById('search');
  searchbar.addEventListener('keyup', () => {
    const value = searchbar.value.toLowerCase();
    search(value);
  });
  searchbar.addEventListener('change', () => {
    const value = searchbar.value.toLowerCase();
    search(value);
  });
});
