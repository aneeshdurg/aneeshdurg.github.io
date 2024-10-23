import datetime
import os
import sys

# The number of years to display per row
step = 3
if len(sys.argv) > 1:
    step = int(sys.argv[1])

# Date to start displaying from
start = datetime.date(2016, 1, 1)

dates_to_count = {}
for dir_, _, files in os.walk('.'):
    for file_name in files:
        if file_name.endswith('.md'):
            try:
                d = datetime.date(*[int(x) for x in file_name.split('-')[:3]])
                dates_to_count[d] = dates_to_count.get(d, 0) + 1
            except:
                pass

end = max(dates_to_count.keys())

def print_stats(year, month):
    str_ = ""
    if month == 0:
        str_ += f"[{year}]"
    else:
        start = datetime.date(year, month, 1)
        if month == 12:
            end = datetime.date(year + 1, 1, 1)
        else:
            end = datetime.date(year, month + 1, 1)
        curr = start
        while curr < end:
            if curr not in dates_to_count:
                if datetime.date.today() == curr:
                    str_ += '*'
                else:
                    str_ += '.'
            else:
                str_ += str(dates_to_count[curr])
            curr += datetime.timedelta(days=1)
    print(str_, end="")
    return len(str_)

def print_divider():
    for _ in range(step):
        print('+', end="")
        print('-' * 33, end="")
    print('+')

print_divider()
for year in range(start.year, end.year + 1, step):
    for month in range(13):
        print('| ', end="")
        for i in range(step):
            c = print_stats(year + i, month)
            r = 32 - c
            print(' ' * r, end="")
            print('| ', end="")
        print()
    print_divider()
