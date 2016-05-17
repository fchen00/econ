import csv

# FOOD 
# red trend IMPORT
imp = [
39694,
41243,
43602,
45979,
46641]
per1 = (imp[1] - imp[0])/imp[0] * 100
per2 = (imp[2] - imp[1])/imp[1] * 100
per3 = (imp[3] - imp[2])/imp[2] * 100
per4 = (imp[4] - imp[3])/imp[3] * 100
data = []
last = imp[4]
perAvg = ((per1 + per2 + per3 + per4) / 4) / 100
for i in range(0,13):
	addOn = perAvg*last
	last = last + addOn
	data.append(int(last))

# red export
exp = [
51507,
46397,
45977,
47871,
49407]
per1 = (exp[1] - exp[0])/exp[0] * 100
per2 = (exp[2] - exp[1])/exp[1] * 100
per3 = (exp[3] - exp[2])/exp[2] * 100
per4 = (exp[4] - exp[3])/exp[3] * 100
data2 = []
last = exp[4]
perAvg = ((per1 + per2 + per3 + per4) / 4) / 100
for i in range(0,13):
	addOn = perAvg*last
	last = last + addOn
	data2.append(int(last))

# red trend EMP
emp = [13580480, 13654860, 13919710, 14073830, 14078240]
per1 = (emp[1] - emp[0])/emp[0] * 100
per2 = (emp[2] - emp[1])/emp[1] * 100
per3 = (emp[3] - emp[2])/emp[2] * 100
per4 = (emp[4] - emp[3])/emp[3] * 100

data3 = []
last = emp[4]
perAvg = ((per1 + per2 + per3 + per4) / 4) / 100
for i in range(0,13):
	addOn = perAvg * last
	last = last + addOn
	data3.append(int(last))
################################################################
# blue trend IMPORT
imp = [
55831,
62143,
68094,
74938,
81683,
88997]
per1 = (imp[1] - imp[0])/imp[0] * 100
per2 = (imp[2] - imp[1])/imp[1] * 100
per3 = (imp[3] - imp[2])/imp[2] * 100
per4 = (imp[4] - imp[3])/imp[3] * 100
per5 = (imp[5] - imp[4])/imp[4] * 100
data4 = []
last = imp[5]
perAvg = ((per1 + per2 + per3 + per4 + per5) / 5) / 100
for i in range(0,6):
	addOn = perAvg * last
	last = last + addOn
	data4.append(int(last))

# blue export
exp = [
55026,
56570,
58955,
65962,
84264,
108349]
per1 = (exp[1] - exp[0])/exp[0] * 100
per2 = (exp[2] - exp[1])/exp[1] * 100
per3 = (exp[3] - exp[2])/exp[2] * 100
per4 = (exp[4] - exp[3])/exp[3] * 100
per4 = (exp[5] - exp[4])/exp[4] * 100
data5 = []
last = exp[5]
perAvg = ((per1 + per2 + per3 + per4 + per5) / 5) / 100
for i in range(0,6):
	addOn = perAvg * last
	last = last + addOn
	data5.append(int(last))

# blue trend EMP 
emp = [
13166830,
13323110,
13544950,
13727370,
14005450,
14215350]
per1 = (emp[1] - emp[0])/emp[0] * 100
per2 = (emp[2] - emp[1])/emp[1] * 100
per3 = (emp[3] - emp[2])/emp[2] * 100
per4 = (emp[4] - emp[3])/emp[3] * 100
per5 = (emp[5] - emp[4])/emp[4] * 100
data6 = []
last = emp[5]
perAvg = ((per1 + per2 + per3 + per4 + per5) / 5) / 100
for i in range(0,6):
	addOn = perAvg * last
	last = last + addOn
	data6.append(int(last))




with open('food2.csv', 'w', newline='') as csvfile:
		spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
		spamwriter.writerow(['food red import'])
		for i in range(0,13):
			temp = []
			temp.append(data[i])
			spamwriter.writerow(temp)

		spamwriter.writerow(['food red export'])
		for i in range(0,13):
			temp = []
			temp.append(data2[i])
			spamwriter.writerow(temp)
		
		spamwriter.writerow(['food red emp'])
		for i in range(0,13):
			temp = []
			temp.append(data3[i])
			spamwriter.writerow(temp)

		spamwriter.writerow(['food blue import'])
		for i in range(0,6):
			temp = []
			temp.append(data4[i])
			spamwriter.writerow(temp)

		spamwriter.writerow(['food blue export'])
		for i in range(0,6):
			temp = []
			temp.append(data5[i])
			spamwriter.writerow(temp)
		
		spamwriter.writerow(['food blue emp'])
		for i in range(0,6):
			temp = []
			temp.append(data6[i])
			spamwriter.writerow(temp)


