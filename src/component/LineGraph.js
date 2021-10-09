import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const LineGraph = ({ casesType = 'cases' }) => {
  const [data, setData] = useState({})

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format('+0,0')
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            format: 'MM/DD/YY',
            tooltipFormat: 'll',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format('0a')
            },
          },
        },
      ],
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildData(data, casesType)
          setData(chartData)
        })
    }
    fetchData()
  }, [casesType])

  const buildData = (data, casesType) => {
    let chartData = []
    let lastDataPoint
    if (casesType === 'recovered') {
      for (let date in data.cases) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date],
        }
        chartData.push(newDataPoint)
      }
      return chartData;
    } else {
      for (let date in data.cases) {
        if (lastDataPoint) {
          const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
          }
          chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
      }
    }
    return chartData
  }

  if (data.length > 0) {
    return (
      <div>
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(225, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options}
        />
      </div>
    )
  } else return <div></div>
}

export default LineGraph
