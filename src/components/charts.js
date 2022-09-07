import React, { useEffect, useState } from 'react';
import * as chartJs from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { API } from '../config/api';


chartJs.Chart.register(
    chartJs.CategoryScale,
    chartJs.LinearScale,
    chartJs.BarElement,
    chartJs.Title,
    chartJs.ArcElement,
    chartJs.Tooltip,
    chartJs.Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

export default function BarChart() {
    const [member, setMember] = useState([]);
    const Bulan = new Date().getMonth()
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    console.log(Bulan);
    useEffect(() => {
        async function dataMember() {
            const db = await API.get('/members')
            return setMember(db.data.data.data)
        }
        dataMember();
    }, [])


    let numPemWah19 = 0;
    let numLakWah19 = 0;
    let peremDiBawah19 = [];
    const lakiDiBawah19 = [];
    let numPemAtas20 = 0;
    let numLakAtas20 = 0;
    let peremDiAtas20 = [];
    const lakiDiAtas20 = [];

    member.map(item => {
        if (item.gender === 'female' && item.age <= 19) {
            peremDiBawah19.push(numPemWah19 += 1);
        }
        if (item.gender === 'male' && item.age <= 19) {
            lakiDiBawah19.push(numLakWah19 += 1);
        }
        if (item.gender === 'female' && item.age >= 20) {
            peremDiAtas20.push(numPemAtas20 += 1);
        }
        if (item.gender === 'male' && item.age >= 20) {
            lakiDiAtas20.push(numLakAtas20 += 1);
        }
    });
    console.log('aaa', peremDiBawah19);

    const totallaki20 = lakiDiAtas20.length
    const totallaki19 = lakiDiBawah19.length
    const totalcewe20 = peremDiAtas20.length
    const totalcewe19 = peremDiBawah19.length

    console.log('tetst', lakiDiAtas20);
    const data = {
        labels,
        datasets: [
            {
                label: 'Perempuan dibawah 19 tahun',
                data: [totalcewe19],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Perempuan diatas 20 tahun',
                data: [totalcewe20],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Laki dibawah 19 tahun',
                data: [totallaki19],
                backgroundColor: 'rgba(0, 0, 0)',
            },
            {
                label: 'Laki diatas 20 tahun',
                data: [totallaki20],
                backgroundColor: 'rgb(223,133,24)',
            },
        ],
    };
    console.log(member)
    return <Bar options={options} data={data} />;
}
