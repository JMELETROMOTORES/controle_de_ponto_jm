

import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

dayjs.extend(isBetween);
dayjs.extend(utc);

interface WorkDay {
    date: Date;
    clockedIn?: Date;
    lunchStart?: Date;
    lunchEnd?: Date;
    clockedOut?: Date;
}

interface PaidAbsence {
    date: Date;
    reason: string;
}

interface Reports {
    employeeName: string;
    interval: string;
    totalDelay: number;
    totalOvertime: number;
    totalWorkedHours: number;
    absences: number;
    paidAbsences: PaidAbsence[];
    workDays: WorkDay[];
}

// Tipos para mapas de dados processados.
interface DayInfo {
    clockedIn?: string;
    lunchStart?: string;
    lunchEnd?: string;
    clockedOut?: string;
}

interface WorkDaysMap {
    [date: string]: DayInfo;
}

interface PaidAbsencesMap {
    [date: string]: string[];
}

export function formatSeconds(seconds: any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}


export const HtmlBolTemplate = (attendances: any) => {


    const startDate = dayjs(attendances.interval.split(" - ")[0], "DD/MM/YYYY");
    const endDate = dayjs(attendances.interval.split(" - ")[1], "DD/MM/YYYY");


    const workDaysMap = attendances.workDays.reduce((map: any, day: any) => {
        const dateKey = dayjs(day.clockedIn).format('YYYY-MM-DD');
        map[dateKey] = {
            clockedIn: day.clockedIn ? dayjs(day.clockedIn).utc().format('HH:mm') : '-',
            lunchStart: day.lunchStart ? dayjs(day.lunchStart).utc().format('HH:mm') : '-',
            lunchEnd: day.lunchEnd ? dayjs(day.lunchEnd).utc().format('HH:mm') : '-',
            clockedOut: day.clockedOut ? dayjs(day.clockedOut).utc().format('HH:mm') : '-',
            hoursWorked: formatSeconds(day.hoursWorked),
            delay:formatSeconds(day.delay),
            overtime: formatSeconds(day.overtime),
        };
        return map;
    }, {});

    const paidAbsencesMap = attendances.paidAbsences.reduce((map: any, absence: any) => {
        const dateKey = dayjs(absence.date).format('YYYY-MM-DD');
        if (!map[dateKey]) {
            map[dateKey] = [];
        }
        map[dateKey].push(absence.absenseReason);
        return map;
    }, {});

    const daysAbsencesSet = new Set(attendances.daysAbsences.map((date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format('YYYY-MM-DD')));
    console.log(startDate);
        console.log(endDate);
    const days = [];
    for (let day = startDate; day.isBefore(endDate.add(1, 'day')); day = day.add(1, 'day')) {
    
        const dateKey = day.format('YYYY-MM-DD');
        if (workDaysMap[dateKey]) {
            const dayInfo = workDaysMap[dateKey];
            days.push(`<tr>
                <td>${day.format('DD/MM/YYYY')}</td>
                <td>${dayInfo.clockedIn}</td>
                <td>${dayInfo.lunchStart}</td>
                <td>${dayInfo.lunchEnd}</td>
                <td>${dayInfo.clockedOut}</td>
                <td>${dayInfo.hoursWorked}</td>
                <td>${dayInfo.delay}</td>
                <td>${dayInfo.overtime}</td>
            </tr>`);
        } else if (paidAbsencesMap[dateKey]) {
            days.push(`<tr>
                <td>${day.format('DD/MM/YYYY')}</td>
                <td colspan="8">Abonado: ${paidAbsencesMap[dateKey].join(', ')}</td>
            </tr>`);
        } else if (daysAbsencesSet.has(dateKey)) {
            days.push(`<tr>
                <td>${day.format('DD/MM/YYYY')}</td>
                <td colspan="8">Falta</td>
            </tr>`);
        } else {
            days.push(`<tr>
                <td>${day.format('DD/MM/YYYY')}</td>
                <td colspan="8">-</td>
            </tr>`);
        }
    }

    console.log(days);

  return `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Folha de Ponto</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap">
      <style>
  
  body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
  }
  
  .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 0 20px;
  }
  
  .folha-de-ponto, .dados-empregador, .dados-trabalhador, .expediente{
      margin-bottom: 10px;
      border: 1px solid #cccccc60;
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 20px;
  }
  
  
  .assin_r{
      display: flexbox;
      text-align: center;
      margin-bottom: 10px;
      border: 1px solid #cccccc60;
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 50px;
  }
  
  .assin_t{
      display: flexbox;
      text-align: center;
      margin-bottom: 10px;
      border: 1px solid #cccccc60;
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 50px;
  }
  
  .cienc{
      margin-top: 10px;
      text-align: center;
      margin-bottom: 10px;
      border: 1px solid #cccccc60;
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 20px;
  }
  
  .folha-de-ponto h1, .dados-empregador h2, .dados-trabalhador h2, .expediente h2 {
      margin-top: 0;
  }
  
  ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
  }
  
  ul li {
      margin-bottom: 10px;
  }
  
  table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
  }
  
  th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
  }
  
  th {
      background-color: #8f8f8f;
      color: white;
  }
  
  tr:nth-child(even) {
      background-color: #f2f2f2;
  }
  
  @media screen and (max-width: 600px) {
              /* Transforma a tabela em uma tabela de formato tabular */
              table, thead, tbody, th, td, tr {
                  display: block;
              }
  
              /* Remove a borda das células */
              th, td {
                  border: none;
                  padding: 8px;
              }
  
              /* Adiciona uma borda inferior para as células de cabeçalho */
              th {
                  border-bottom: 1px solid #ddd;
              }
  
              /* Adiciona uma borda inferior para as células, exceto a última linha */
              td {
                  border-bottom: 1px solid #ddd;
              }
  
              /* Adiciona espaçamento entre as células */
              td:before {
                  content: attr(data-label);
                  float: left;
                  font-weight: bold;
              }
          }
  
      </style>
  </head>
  
  <body>
      
      <div class="container">
          <div class="folha-de-ponto">
              <h1>Folha de Ponto</h1>
          </div>
          <div class="dados-trabalhador">
              <h2>Dados do Trabalhador</h2>
              <ul>
              <li><strong>Nome:</strong> ${attendances.employeeName}</li>
              <li><strong>Período:</strong> ${attendances.interval}</li>
              <li><strong>Total de Atrasos:</strong> ${formatSeconds(attendances.totalDelay || 0)}</li>
              <li><strong>Total de Horas Extras:</strong> ${formatSeconds(attendances.totalOvertime || 0)}</li>
              <li><strong>Total de Horas Trabalhadas:</strong> ${formatSeconds(attendances.totalWorkedHours)} horas</li>
              <li><strong>Total de Ausências:</strong> ${attendances.absences} dias</li>
          </ul>
          </div>
      <div style="overflow-x:auto;">
      <table>
      <thead>
          <tr>
              <th>Dia</th>
              <th>Entrada</th>
              <th>Saida</th>
            <th>Entrada</th>
            <th>Saida</th>
            <th>Horas Trabalhadas</th>
            <th>Atraso</th>
            <th>Horas Extras</th>
          </tr>
      </thead>
      <tbody>
      ${days.join('')}
  </tbody>
  </table>
          </table>
      </div>
      <div class="cienc">
              <ul>
                  <li>
                      Reconheço com exatidão os registros constantes neste documento, pois represento o ocorrido neste período.
                  </li>
              </ul>
          </div>
          <div class="distan_assin">
              <div class="assin_r">
                  <ul>
                      <li>
                          José Evaldo de Almeida Xavier
                      </li>
                  </ul>
                  <ul>
                      <li>
                          <strong>Responsável</strong>
                      </li>
                  </ul>
              </div>   
                  <div class="assin_t">
                      <ul>
                          <li>
                          Clarice Lispector (59)
                          </li>
                      </ul>
                      <ul>
                          <li>
                          <strong>Trabalhador</strong>
                          </li>
                      </ul> 
                  </div>
              
          </div>
  
      </div>
  </div>
  </body>
  </html>
  `;
};
