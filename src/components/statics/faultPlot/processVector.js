import { get } from 'request'

const filename = prompt('Enter filename:')
const vectortype = prompt('Enter vectortype:')

if (!['lines', 'vector', 'seismic', 'stations'].includes(vectortype)) {
    process.exit()
}

// if (!filename.includes('../../tesis/data/') && !filename.includes('../../data/')) {
//     process.exit()
// }

if (vectortype === 'lines') {
    get(filename, (error, response, body) => {
        const filecontents = body.split('X')
        const tempArray = []

        let errorCount = 0
        filecontents.forEach((content) => {
            const lines = content.split('\n')
            tempArray.push(lines)
            if (isNaN(parseFloat(lines[0]))) {
                errorCount++
            }
            if (isNaN(parseFloat(lines[1]))) {
                errorCount++
            }
        })

        if (errorCount === 0) {
            console.log(JSON.stringify(tempArray))
        }
    })
}
