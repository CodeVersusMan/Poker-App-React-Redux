import React from 'react';
const Pot = ({ pot, betAmountThisRound }) => 
<div className="pot">
    <p>Pot: {pot}</p>
    <p>Current bet: {betAmountThisRound}</p>
</div> 
export default Pot;