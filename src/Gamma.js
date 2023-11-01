import { useEffect, useState } from "react";

function Gamma({ dataset }) {
  const [GammaMean, setGammaMean] = useState([]);
  const [GammaMode, setGammaMode] = useState([]);
  const [GammaMedian, setGammaMedian] = useState([]);

  var classGamma = {};
  useEffect(() => {
    var GammaProperty = dataset.map((item) => ({
      ...item,
      Gamma: ((item.Ash * item.Hue) / item.Magnesium).toFixed(2),
    }));

    for (const data of GammaProperty) {
      const alcohol = data["Alcohol"];
      const gamma = data["Gamma"];
      if (classGamma[alcohol]) {
        classGamma[alcohol].push(+gamma);
      } else {
        classGamma[alcohol] = [+gamma];
      }
    }
    console.log("gamma property", classGamma);
    var mean = calculateMeanGamma();
    setGammaMean(mean);
    var median = calculateMedianGamma();
    setGammaMedian(median);
    var mode = calculateModeGamma();
    setGammaMode(mode);
    console.log(mode);
  }, [GammaMean, GammaMode, GammaMedian]);

  const calculateMeanGamma = () => {
    const meanOfGamma = {};
    for (const [alcohol, Gamma] of Object.entries(classGamma)) {
      const sum = Gamma.reduce((acc, current) => acc + current, 0);
      meanOfGamma[alcohol] = sum / Gamma.length;
    }
    return meanOfGamma;
  };

  const calculateMedianGamma = () => {
    const medianOfGamma = {};
    for (const [alcohol, Gamma] of Object.entries(classGamma)) {
      const sortedGamma = Gamma.sort((a, b) => a - b);
      const middle = Math.floor(sortedGamma.length / 2);

      if (sortedGamma.length % 2 === 0) {
        medianOfGamma[alcohol] =
          (sortedGamma[middle - 1] + sortedGamma[middle]) / 2;
      } else {
        medianOfGamma[alcohol] = sortedGamma[middle];
      }
    }
    return medianOfGamma;
  };

  const calculateModeGamma = () => {
    const modeGamma = {};
    for (const [alcohol, Gamma] of Object.entries(classGamma)) {
      const counts = {};
      let maxCount = 0;
      let mode = [];

      for (const gamma of Gamma) {
        counts[gamma] = (counts[gamma] || 0) + 1;
        if (counts[gamma] > maxCount) {
          maxCount = counts[gamma];
          mode = [gamma];
        } else if (counts[gamma] === maxCount) {
          mode.push(gamma);
        }
      }
      modeGamma[alcohol] = mode;
    }
    return modeGamma;
  };

  return (
    <div>
      <h2>Class-wise Gamma mean, median, mode</h2>
      <table>
        <thead>
          <tr>
            <th>Measures</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {Object.entries(GammaMean).map(([key, value]) => (
              <td key={key}>{value.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.entries(GammaMedian).map(([key, value]) => (
              <td key={key}>{value.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.entries(GammaMode).map(([key, value]) => (
              <td key={key}>
                {value.map((i) => (
                  <td className="mode_column">{i.toFixed(3)}</td>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Gamma;
