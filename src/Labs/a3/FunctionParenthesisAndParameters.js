function FunctionParenthesisAndParameters() {
    const square = a => a * a;
    const plusOne = a => a + 1;
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);
    return(
        <div>
            <h3>Parathesis and Parameters</h3>
            twosquared = {twoSquared} <br/>
            square(2) = {square(2)} <br/>
            threePlusOne = {threePlusOne} <br/>
            PlusOne(3) = {plusOne(3)} <br/>
        </div>
    )
}
export default FunctionParenthesisAndParameters