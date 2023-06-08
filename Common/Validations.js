const JOI    =   require('@hapi/joi')

const JOISchema  = JOI.object({
    email : JOI.string().email().lowercase().required(),
    password:JOI.string().min(8).required()
})

module.exports ={JOISchema}