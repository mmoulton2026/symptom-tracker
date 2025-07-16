import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "48aecf06-bffd-4bee-91d2-9b21c86e9298",  // Your Symptom Tracker App client ID
    authority: "https://login.microsoftonline.com/36794658-f219-4ad4-af7b-1b68d1900443", // University of Maine System tenant
    redirectUri: window.location.origin,  // Works for both local and deployed
  },
  cache: {
    cacheLocation: "sessionStorage",  // Can be "localStorage" or "sessionStorage" for token caching
    storeAuthStateInCookie: false,  // Set to true for IE11 or Edge compatibility
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Request configuration for login
export const loginRequest = {
  scopes: ["User.Read"]
};

// Request configuration for token acquisition
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
