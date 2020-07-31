function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleVoltageChange",











    value => {
      this.setState({ voltage: value.target.value });
    });_defineProperty(this, "handleRadiusChange",
    value => {
      this.setState({ radius: value.target.value });
    });_defineProperty(this, "handleDistanceChange",
    value => {
      this.setState({ distance: value });
    });this.state = { voltage: 160000, radius: 0.001, distance: 0.14 };this.VACUUM_PERMITTIVITY = 0.00000000000885;this.COULOMBS_CONSTANT = 8987551787.36817;this.WATER_DENSITY = 1000000; // g/m^3
    this.DIGITS = 3;}
  formatMetric(x, unit, fdigits) {
    let long = false;
    let prefixes = [
    [-24, "y", "yocto"],
    [-21, "z", "zepto"],
    [-18, "a", "atto"],
    [-15, "f", "femto"],
    [-12, "p", "pico"],
    [-9, "n", "nano"],
    [-6, "µ", "micro"],
    [-3, "m", "mili"],
    [0, "", ""],
    [3, "K", "kilo"],
    [6, "M", "mega"],
    [9, "G", "giga"],
    [12, "T", "tera"],
    [15, "P", "peta"],
    [18, "E", "exa"],
    [21, "Z", "zetta"],
    [24, "Y", "yotta"]];


    let prefix = {
      base: 1,
      power: 0,
      symbol: "",
      name: "" };


    if (x != 0) {
      for (var i = 0; i < prefixes.length; i++) {
        var base = Math.pow(10, prefixes[i][0]);
        if (x >= base) {
          prefix = {
            base: base,
            power: prefixes[i][0],
            symbol: prefixes[i][1],
            name: prefixes[i][2] };

        } else break;
      }

      x = x / prefix.base;
    }

    if (fdigits != null) {
      x = parseFloat(x.toFixed(fdigits));
    }

    return x + " " + (long ? prefix.name : prefix.symbol) + (unit || "");
  }

  render() {
    let capacitance =
    4 * Math.PI * this.VACUUM_PERMITTIVITY * this.state.radius;
    let charge = capacitance * this.state.voltage;
    let attractiveForce =
    this.COULOMBS_CONSTANT * (
    charge * charge / (this.state.distance * this.state.distance));
    let distanceFromTop = 0.28 - this.state.distance;
    let repulsiveForce =
    this.COULOMBS_CONSTANT * (
    charge * charge / (distanceFromTop * distanceFromTop));

    let volume = 0.75 * Math.PI * Math.pow(this.state.radius, 3);
    let mass = this.WATER_DENSITY * volume;
    let acceleration = (attractiveForce + repulsiveForce) / mass;

    return (
      React.createElement("div", { className: "App" },
      React.createElement("h3", null, "INPUTS"),
      React.createElement("div", null, "Voltage (V)"),
      React.createElement("input", {
        type: "text",
        value: this.state.voltage,
        onChange: this.handleVoltageChange }),

      React.createElement("br", null),
      React.createElement("div", null, "Drop Radius (m)"),
      React.createElement("input", {
        type: "text",
        value: this.state.radius,
        onChange: this.handleRadiusChange }),

      React.createElement("br", null),
      React.createElement("div", null, "Distance From Can Bottom (m)"),
      React.createElement("i", null, this.state.distance, " m"),
      React.createElement(InputRange, {
        step: 0.01,
        maxValue: .27,
        minValue: .01,
        value: this.state.distance,
        onChange: this.handleDistanceChange,
        valueLabelDisplay: "on" }),

      React.createElement("div", { class: "slider-label" },
      React.createElement("div", { class: "left" }, "Near Bottom of Can"),


      React.createElement("div", { class: "right" }, "Near Human")),



      React.createElement("h3", null, "OUTPUTS"),
      React.createElement("div", null, "Drop Self Capicitance:",
      " ",
      React.createElement("b", null, this.formatMetric(capacitance, "F", this.DIGITS))),

      React.createElement("div", null, "Charge on Drop: ",
      React.createElement("b", null, this.formatMetric(charge, "C", this.DIGITS))),

      React.createElement("div", null, "Electrostatic Attraction:",
      " ",
      React.createElement("b", null, this.formatMetric(attractiveForce, "N", this.DIGITS))),

      React.createElement("div", null, "Electrostatic Repulsion:",
      " ",
      React.createElement("b", null, this.formatMetric(repulsiveForce, "N", this.DIGITS))),

      React.createElement("div", null, "Drop Mass: ",
      React.createElement("b", null, this.formatMetric(mass, "g", this.DIGITS))),

      React.createElement("div", null, "Net Acceleration: ",
      React.createElement("b", null, acceleration.toFixed(this.DIGITS + 2), " m/s^2"))));



  }}


ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));