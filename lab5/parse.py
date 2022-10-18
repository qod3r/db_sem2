

text = []
with open ("EMPLOYEE_BLANK.sql", "r") as f:
    text = f.readlines()

info = []
for idx, line in enumerate(text):
    if "INSERT" in line:
        s = text[idx + 1].strip().split(",")
        # print(len(s), s)
        info.append(s)

res = ""
for doc in info:
    res += f"""
    {{
        id: {doc[0]},
        name: {doc[1]},
        surname: {doc[2]},
        fatherName: {doc[3]},
        email: {doc[4]},
        phoneNumber: {doc[5]},
        birthDate: {doc[6]},
        hobbies: [],
        document: {doc[7]},
    }},
    """

with open ("parsed.js", "w") as f:
    f.write(res)