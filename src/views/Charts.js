
import { Chart, registerables } from 'chart.js';
import React, { useLayoutEffect } from 'react'

const Charts = ({ entries }) => {

  useLayoutEffect(() => {

    const industry_average_salary = {}
    entries.forEach(element => {
      if(!industry_average_salary[element.industry]) {
        industry_average_salary[element.industry] = {
          sum: 0,
          nr: 0
        }
      }
      industry_average_salary[element.industry].sum += element.salary
      industry_average_salary[element.industry].nr++
    });

    const industries = Object.keys(industry_average_salary)
    const averages = Object.values(industry_average_salary).map(({ sum, nr }) => sum/nr )
    console.log('industries', industries)
    console.log('averages', averages)

    const ctx = document.getElementById('myChart');
    Chart.register(...registerables);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: industries,
            datasets: [{
                label: 'Average Salaries',
                data: averages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }, [entries])

  return (
    <React.Fragment>
      <canvas id="myChart" width="400" height="400"></canvas>
    </React.Fragment>
  )
}

export default Charts
