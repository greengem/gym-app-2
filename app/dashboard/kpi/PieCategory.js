"use client";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Tooltip, Title } from 'chart.js';

// Register the necessary elements and plugins
Chart.register(ArcElement, CategoryScale, Tooltip, Title);

export default function PieCategory({ workouts }) {

    // 1. Prepare the Data:
    const categoryCounts = workouts.reduce((acc, workout) => {
        workout.WorkoutLogExercise.forEach(wle => {
            const category = wle.Exercise.category;
            acc[category] = (acc[category] || 0) + 1;
        });
        return acc;
    }, {});

    // 2. Create the Pie Chart Data:
    const data = {
        labels: Object.keys(categoryCounts),
        datasets: [{
            data: Object.values(categoryCounts),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9999',
                '#66FF66',
                '#C39BD3',
                '#EDBB99'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9999',
                '#66FF66',
                '#C39BD3',
                '#EDBB99'
            ]
        }]
    };

    // Chart Options:
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: top,
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                return context[0].label;
              },
              label: function(context) {
                const label = context.label;
                switch(label) {
                  case 'Legs':
                    return ['Legs: 30%', 'Squats', 'Lunges', 'Deadlifts'];
                  case 'Chest':
                    return ['Chest: 20%', 'Bench Press', 'Push Ups'];
                  default:
                    return label;
                }
              }
            }
          }
        }
      };

    // 3. Render the Pie Chart:
    return (
        <Pie data={data} options={options} />
    );
}
