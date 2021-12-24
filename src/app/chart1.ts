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
    },
    config: {
        responsive: boolean
    }
}
