type MapType = {
 className:string;
}

function Map({className}:MapType): JSX.Element {
  return (
    <section className={className} />
  );
}

export default Map;
