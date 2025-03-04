//const Pizza = (prop) => {
//    return React.createElement("h2", null, [
//        React.createElement("h1", null, prop.name),
//        React.createElement("p", null, prop.description),
//    ]);
//};

const Pizza = (prop) => {
  return (
    <div className="pizza">
      <h1>{prop.name}</h1>
      <p>{prop.description}</p>
      <img src={prop.image} alt={prop.name} />
    </div>
  );
};

export default Pizza;
