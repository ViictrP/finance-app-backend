interface LoggerConfig {
  sensitive: string[];
}

const log = (message: string, data?: any, config?: LoggerConfig) => {
  if (!config) {
    console.log(message, data ?? '');
    return;
  }

  const dataWithSensitiveInformation = {...data};
  config.sensitive.map(prop => {
    if (dataWithSensitiveInformation.hasOwnProperty(prop)) {
      dataWithSensitiveInformation[prop] = "****";
    }
  });
  console.log(message, dataWithSensitiveInformation);
};

export {
  log
};
