interface Data {
    x: string[],
    y: number[],
    name: string,
    type: string,
    orientation: string,
    legendgroup: string,
    mode: string,
    marker: {
        color: string[],
        opacity: number,
    }
}

export interface Chart2 {
    data: Data[],
    layout: {
      title: string,
      barmode: string,
      plot_bgcolor: string,
      paper_bgcolor: string,
      legend: {
        x: number,
        y: number,
        orientation: string,
        bgcolor: string
      },
      xaxis: {
        tickangle: number
      },
      yaxis: {
        title: string
      },
    },
    config: {
        responsive: boolean,
        displayModeBar: boolean
      }
  }