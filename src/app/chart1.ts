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
        plot_bgcolor: string,
        paper_bgcolor: string,
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
