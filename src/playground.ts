enum DataType {
  STRING = "STRING",
  CATEGORY = "CATEGORY",
  NUMBER = "NUMBER",
  GROUP = "GROUP",
}

(() => {
  const rawData3 = {
    models: [
      {
        name: "general",
        models: [
          {
            name: "name",
            type: DataType.STRING,
          },
          {
            name: "lastname",
            type: DataType.STRING,
          },
          {
            name: "age",
            type: DataType.NUMBER,
          },
        ],
      },
      {
        name: "company",
        models: [
          {
            name: "jobs",
            type: DataType.CATEGORY,
          },
        ],
      },
    ],
    values: [
      { key: "name", value: "John" },
      { key: "lastname", value: "Doe" },
      { key: "age", value: 12 },
      { key: "jobs", value: ["developer", "CEO"] },
    ],
  };

  type DetailInformation = {
    name: string;
    type: DataType;
  };

  type DataInformation = Record<string, DetailInformation[]>;

  const result = rawData3.models.map((model) => {
    return {
      [model.name]: {
        type: DataType.GROUP,
        values: model.models
          .map((model) => {
            return rawData3.values
              .map((value) => {
                if (model.name === value.key) {
                  return {
                    [model.name]: {
                      type: model.type,
                      value: value.value,
                    },
                  };
                }
              })
              .filter((item) => item)
              .reduce((acc, item) => {
                return { ...acc, ...item };
              }, {});
          })
          .reduce((acc, item) => {
            return { ...acc, ...item };
          }, {}),
      },
    };
  });
  console.log("items: ", JSON.stringify(result, null, 2));
})();
