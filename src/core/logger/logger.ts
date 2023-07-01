interface LoggerConfig {
  sensitive: string[];
}

const log = (message: string, data?: any, config?: LoggerConfig) => {
  const now = new Date().toISOString();
  if (!config) {
    console.log(`${now} ${message}`, data ?? '');
    return;
  }

  const dataWithSensitiveInformation = {...data};
  config.sensitive.map(prop => {
    if (dataWithSensitiveInformation.hasOwnProperty(prop)) {
      dataWithSensitiveInformation[prop] = "****";
    }
  });
  console.log(`${now} ${message}`, dataWithSensitiveInformation);
};

export {
  log
};
