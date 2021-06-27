
module.exports = (req, res) => {


    let units = req.query.units.toLowerCase().trim()
    //console.log(units)
    let slashCount = 0;

    for (let i = 0; i < units.length; i++) {
        if (units[i] === '/') {
            slashCount++
        }
    }
    //if there are more than one // in the number, an error is returned
    //or if there is no unit entered
    // || units === ''
    if (slashCount > 1 ) {
       // console.log('this is an error')

        res.render('index', {
            title: 'Imperial Converter',
            logic: 'Error. Please try again.',
            showResult: true
        })

    }

    else {
        let numberRegex = /[a-zA-Z]/
        let letterRegex = /[0-9/.//]/
        //here I am splitting the string that is received from the form into letters and numbers
        let splitNumber = units.split(numberRegex)
        let splitLetter = units.split(letterRegex)

        let newNumber = splitNumber.shift()
        //console.log(newNumber)

        let newLetter = splitLetter.pop()
        //working units is the numerical value, and the unit to convert
        let workingUnits = [];
        //if no number is entered, the default is one
        if (newNumber === '') {
            newNumber = 1
        }
        workingUnits = [newNumber, newLetter]
        //console.log(workingUnits)

        //checking to see if the number entered contains a fraction
        let fractionRegex = /\//
        if (fractionRegex.test(workingUnits[0])) {
            //console.log('this is a fraction')

            let splitWorkNumFirstIndex = workingUnits[0].split(' ')[0]
            let splitWorkNumSecondIndex = workingUnits[0].split(' ')[1]
            //this next code block is checking to see if it is only a fraction
            //not a mixed number. If so, this code is converting it from a fraction
            //to a float
            if (fractionRegex.test(splitWorkNumFirstIndex)) {
                let divideMe = splitWorkNumFirstIndex.split('/')

                let fracToDec = parseFloat(divideMe[0] / parseFloat(divideMe[1]))

                //reassigning working units to contain the float of the decimal entered, as well as the unit
                workingUnits = [fracToDec, newLetter]

            }
            //this else if is for mixed numbers. If for example someone enters 2 1/2, it will correctly convert it to 2.5
            else if (fractionRegex.test(splitWorkNumSecondIndex)) {
                let divideMeAgain = splitWorkNumSecondIndex.split('/')

                let fracToDecAgain = parseFloat(divideMeAgain[0] / parseFloat(divideMeAgain[1]))

                let fractionToFloat = parseFloat(splitWorkNumFirstIndex) + parseFloat(fracToDecAgain)

                //reassigning workingUnits to contain a mixed number if necessary
                workingUnits = [fractionToFloat, newLetter]
            }
        }
        //whole number or float
        else if (!fractionRegex.test(workingUnits[0])) {
            let wholeNumber = parseFloat(workingUnits[0])
            //console.log('whole number')

            workingUnits = [wholeNumber, newLetter]
        }

        //console.log(workingUnits)
        //now we will work on getting the units to the appropriate units based on the abbreviation entered.

        //gallons conversion here
        let resultUnit;
        let conversion = 0;
        if (workingUnits[1] === 'gal') {

            conversion = (workingUnits[0] * 4.546).toFixed(4)
            if (newNumber <= 1) {
                resultUnit = 'gallon'
            }
            else {
                resultUnit = 'gallons'
            }


            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} litres.`,
                showResult: true
            })

        }
        //Litres
        else if (workingUnits[1] === 'l') {
            conversion = (workingUnits[0] / 4.546).toFixed(4)
            if (newNumber <= 1) {
                resultUnit = 'litre'
            }
            else {
                resultUnit = 'litres'
            }

            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} gallons.`,
                showResult: true
            })

        }
        //Miles
        else if (workingUnits[1] === 'mi') {
            conversion = (workingUnits[0] * 1.6093).toFixed(4)
            if (newNumber <= 1) {
                resultUnit = 'mile'
            }
            else {
                resultUnit = 'miles'
            }

            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} kilometers.`,
                showResult: true
            })

        }
        //Kilometers
        else if (workingUnits[1] === 'km') {
            conversion = (workingUnits[0] / 1.6093).toFixed(4)
            if (newNumber <= 1) {
                resultUnit = 'kilometer'
            }
            else {
                resultUnit = 'kilometers'
            }

            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} miles.`,
                showResult: true
            })

        }
        //Pounds
        else if (workingUnits[1] === 'lbs') {
            conversion = (workingUnits[0] * 0.45359237).toFixed(4)

            if (newNumber <= 1) {
                resultUnit = 'pound'
            }
            else {
                resultUnit = 'pounds'
            }
            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} kilograms.`,
                showResult: true
            })

        }
        //Kilograms
        else if (workingUnits[1] === 'kg') {
            conversion = (workingUnits[0] * 2.205).toFixed(4)

            if (newNumber <= 1) {
                resultUnit = 'kilogram'

            }
            else {
                resultUnit = 'kilograms'
            }

            res.render('index', {
                title: 'Imperial Converter',
                logic: `${newNumber} ${resultUnit} is ${conversion} pounds.`,
                showResult: true
            })

        }
        else {
            res.render('index', {
                title: 'Imperial Converter',
                showResult: true,
                logic: 'Error. Invalid input Unit. Please try again.'
            })
        }

    }

}

