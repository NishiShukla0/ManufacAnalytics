import { useEffect, useState } from "react";

function WineStatistics({dataset}) {  
  const [mean, setMean] = useState([]);
  const [mode, setMode] = useState([]);
  const [median, setMedian] = useState([]);
  var classFlavanoids = {};
  useEffect(() => {
      for (const data of dataset) {
        const alcohol = data["Alcohol"];
        const flavanoids = data["Flavanoids"];
        if (classFlavanoids[alcohol]) {
          classFlavanoids[alcohol].push(+flavanoids);
        } else {
          classFlavanoids[alcohol] = [+flavanoids];
        }
      }
      var mean = calculateMeanFlavanoids();
      setMean(mean);
      var median = calculateMedianFlavanoids();
      setMedian(median);
      var mode = calculateModeFlavanoids();
      setMode(mode);
    },[mean,median,mode]);
  

  const calculateMeanFlavanoids = () => {
    const meanOfFlavanoids = {};
    for (const [alcohol, flavanoids] of Object.entries(classFlavanoids)) {
      const sum = flavanoids.reduce((acc, current) => acc + current, 0);
      meanOfFlavanoids[alcohol] = sum / flavanoids.length;
    }
    return meanOfFlavanoids;
  };

  const calculateMedianFlavanoids = () => {
    const medianOfFlavanoids = {};
    for (const [alcohol, flavanoids] of Object.entries(classFlavanoids)) {
      const sortedFlavanoids = flavanoids.sort((a, b) => a - b);
      const middle = Math.floor(sortedFlavanoids.length / 2);

      if (sortedFlavanoids.length % 2 === 0) {
        medianOfFlavanoids[alcohol] =
          (sortedFlavanoids[middle - 1] + sortedFlavanoids[middle]) / 2;
      } else {
        medianOfFlavanoids[alcohol] = sortedFlavanoids[middle];
      }
    }

    return medianOfFlavanoids;
  };

  const calculateModeFlavanoids = () => {
    const modeFlavanoids = {};
    for (const [alcohol, flavanoids] of Object.entries(classFlavanoids)) {
      const counts = {};
      let maxCount = 0;
      let mode = [];
      
      for (const flav of flavanoids) {
        counts[flav] = (counts[flav] || 0) + 1;
        if (counts[flav] > maxCount) {
            
          maxCount = counts[flav];
          mode = [flav];
        } else if (counts[flav] === maxCount) {
          mode.push(flav);
        }        
      }
      modeFlavanoids[alcohol] = mode;
    }
    return modeFlavanoids;
  };

  return (
    <div>
      <h2>Class-wise Flavanoids mean, median, mode</h2>
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
            <td>Flavanoids Mean</td>
            {Object.entries(mean).map(([key, value]) => (
              <td key={key}>{value.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {Object.entries(median).map(([key, value]) => (
              <td key={key}>{value.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            
            <td>Flavanoids Mode</td>
            {Object.entries(mode).map(([key, value]) => (
              <td key={key}>{value.map(i=><td className="mode_column">{i}</td>)}</td>
            ))}
            
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WineStatistics;
