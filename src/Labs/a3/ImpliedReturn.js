function ImpliedReturn() {
    const multiply = (a, b) => a * b;
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);
    return(
        <div>
            <h3>Implied Return</h3>
            fourTimesFive = 20<br/>
            multiply(4, 5) = 20<br/>
        </div>
    )
}
export default ImpliedReturn