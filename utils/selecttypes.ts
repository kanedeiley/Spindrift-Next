
export type BoardLabel = 
| 'tow'
| 'fish'
| 'shortboard'
| 'gun'
| 'egg'
| 'longboard'
| 'funboard'
| 'groveler'

type Board = {
    label: BoardLabel;
}

export const boardType: Board[] = [
{label: 'tow',},
{label: 'fish',},
 {label: 'shortboard',},
{label: 'gun',},
 {label: 'egg',},
{label: 'longboard',},
{label: 'funboard',},
{label: 'groveler',}
]


export type FinLabel = 
| 'single'
| 'twin'
| 'thruster'
| '2+1'
| 'quad'

type Fin = {
    label: FinLabel;
}

export const finSetup: Fin[] = [
{label: 'single',},
{label: 'twin',},
 {label: 'thruster',},
{label: '2+1',},
 {label: 'quad',},

]

