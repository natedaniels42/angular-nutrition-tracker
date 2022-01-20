export interface Chart1 {
    data: [{
        values: number[],
        labels: string[],
        type: string,
        marker: {
            colors: string[]
        }
    }],
    layout: {
        title: string,
        legend: {
            x: number,
            y: number,
            orientation: string,
            bgcolor: string
          },
    },
    config: {
        responsive: boolean
        displayModeBar: boolean
    }
}
