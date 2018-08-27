let express = require('express');
let graphqlHTTP = require('express-graphql');
import { sample1 } from "../sample/sample";
import { buildSchema, printSchema } from 'graphql';
import { GenSchema } from "../schema/GenSchema";

const app = express();

let gen: GenSchema = new GenSchema();
let objests = gen.generate(JSON.parse(sample1));
let strArray = objests.map(obj => {
    return obj.toSchema();
})

var schema = buildSchema(strArray.join("\n"));
console.info(printSchema(schema));

var sampleObject = JSON.parse(sample1);
var root = {
    quiz: () => {
        return sampleObject.quiz;
    },
    final:() =>{
        return sampleObject.fina;
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

const port = 4000;
app.listen(port, (err: any) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});