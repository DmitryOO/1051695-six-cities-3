
function Spinner(){
  return (
    <div className="spinner" style={{fontSize:'40px', textAlign: 'center'}}>
      <p>Loading...</p>
      <img style={{width:'5%'}} src="../../img/loading.gif"/>
    </div>
  );
}

export default Spinner;

