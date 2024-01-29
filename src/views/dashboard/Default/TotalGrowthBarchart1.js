import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { Context } from 'context/Context';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 1,
    label: 'Week 1'
  },
  {
    value: 2,
    label: 'Week 2'
  },
  {
    value: 3,
    label: 'Week 3'
  },
  {
    value: 4,
    label: 'Week 4'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart1 = ({ isLoading }) => {
  const {data , setData} = useContext(Context)
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [ dataValues , setdataValues] = useState([])
  const { navType } = customization;
  const { primary } = theme.palette.text;
  
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const [ title ,setTitle] = useState('')
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const [ weekData, setWeekData] = useState([])
  const [ week , setWeek] = useState(1)
  const [metrics,setMetrics]= useState([])
  const [ totalTasks, setTotalTasks] = useState()
  const [ highestWorkedMetric , setHighestWorkedMetric] = useState('')
  const [weeks,setWeeks] = useState([])
  useEffect(()=>{
setData(JSON.parse(localStorage.getItem('data')))
  },[])
  var arr=[]
useEffect(()=>{

  if(data?.length >0)
  {
    data.map(obj=>{
      Object.keys(obj).map(key=>{
        if(key.trim() ==="Week")
        {
          arr.push(obj[key])
        }
      })
    })
    setWeeks(arr)
    setWeekData(Object.values(data[week-1]).slice(1))
    setMetrics(Object.keys(data[week-1]).slice(1))
  }
setdataValues(data.map(row=>(
  Object.values(row).map((value=>value))
 
)))
},[data,week])
useEffect(()=>{
setTotalTasks(weekData.reduce((accumulator,currentVal)=>accumulator+currentVal,0))
},[weekData])

  const chartData = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
    
      //   colors: ['#546E7A','#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      //   '#f48024', '#69d2e7'
      // ]
      // ,
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          distributed:true,
          horizontal: false,
          columnWidth: '50%'
        }
      },
      colors:["#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"],
      xaxis: {
        // type: 'category',
        categories:metrics,
        labels: {
          show: false,
        }
        
      },
      legend: {
        show: true,
        fontSize: '12px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 7,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: [
      {
        // name: 'Investment',
        data: weekData
      },
      // {
      //   name: 'Loss',
      //   data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
      // },
      // {
      //   name: 'Profit',
      //   data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
      // },
      // {
      //   name: 'Maintenance',
      //   data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
      // }
    ]
  };  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
    //   colors: ['#546E7A','#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
    //   '#f48024', '#69d2e7'
    // ],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          },
          
        },
        
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        },
       
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Week {week}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">Totally worked on {totalTasks} Tasks</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={week} onChange={(e) => setWeek(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart1;
