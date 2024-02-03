// data transformer for doughnut chart
const doughnutDataTransformer = (dataState) => {
  const { probabilities, data, colors } = dataState;

  const transformedData = {
    labels: probabilities || [],
    datasets: [
      {
        label: "Probabilities",
        data: data,
        backgroundColor: colors,
      },
    ],
  };

  // console.log(transformedData);

  return transformedData;
};

export default doughnutDataTransformer;
