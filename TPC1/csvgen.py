curso = input("Curso: ")

import csv              
f = open('grades.csv')
csv_f = csv.reader(f)   
data = []

for row in csv_f: 
   data.append(row)
f.close()

def convert_row(row):
    return """\t<aluno>
    \t<numero>%s</numero>
    \t<nome>%s</nome>
    \t<cadeiras>
    \t\t<cadeira>GCS</cadeira>
    \t\t<cadeira>PRI</cadeira>
    \t</cadeiras>
\t</aluno>""" % (row[0], row[1])

docentes = '<docentes>\n\t<docente id="jcr">\n\t\t<nome>José Carlos Leite Ramalho</nome>\n\t\t<email>jcr@mail.com</email>\n\t\t<cadeira>PRI</cadeira>\n\t</docente>\n\t<docente id="prh">\n\t\t<nome>Pedro Manuel Rangel Santos Henriques</nome>\n\t\t<email>prh@mail.com</email>\n\t<cadeira>GCS</cadeira>\n</docente>\n</docentes>\n'

xml = '<turma curso="' + curso + '">\n' + docentes + '\n'.join([convert_row(row) for row in data[1:]]) + '\n\t<cadeiras>\n\t\t<cadeira>GCS</cadeira>\n\t\t<cadeira>PRI</cadeira>\n\t</cadeiras>' + '\n</turma>'

f = open( curso + ".xml", "a")
f.write(xml)
f.close()