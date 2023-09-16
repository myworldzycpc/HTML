
import os


def get_filelist(dir, path):
    Filelist = []
    for home, dirs, files in os.walk(path):
        for filename in files:
            Filelist.append((os.path.join(home, filename), filename))
    return Filelist


replacelist = get_filelist(dir, 'D:/Python/html/trm')
filelist = get_filelist(dir, 'D:/Python/html/synchronize files')
will_replace = []
for file in replacelist:
    if file[1] in (i[1] for i in filelist):
        with open("D:/Python/html/synchronize files/"+file[1]) as f:
            content = f.read()
        with open(file[0]) as f:
            content2 = f.read()
        if content != content2:
            will_replace.append(file[0])
if will_replace:
    print("\n".join(will_replace))
    ans = input("to replace ? (y) : ")
    if ans == "y":
        for file in replacelist:
            if file[1] in (i[1] for i in filelist):
                with open("D:/Python/html/synchronize files/"+file[1]) as f:
                    content = f.read()
                with open(file[0], "w") as f:
                    f.write(content)
else:
    print("no file to replace")
