import { IContext } from '.';

export const notNullOrUndefined = ([, value]: [string, string]) =>
    value !== undefined && value !== null;

export const urlWithContextAsQuery = (url: string, context: IContext) => {
    // Parse the URL string to extract the base URL and existing query parameters
    const urlParts = url.split('?');
    const baseUrl = urlParts[0];
    const existingQueryParams = urlParts[1] ? urlParts[1].split('&') : [];

    // Initialize an array to hold the updated query parameters
    const updatedQueryParams: string[] = [];

    // Add context information to URL query params
    Object.entries(context)
        .filter(notNullOrUndefined)
        .forEach(([contextKey, contextValue]) => {
            if (contextKey === 'properties' && contextValue) {
                Object.entries<string>(contextValue)
                    .filter(notNullOrUndefined)
                    .forEach(([propertyKey, propertyValue]) =>
                        updatedQueryParams.push(
                            encodeURIComponent(`properties[${propertyKey}]`) + `=${propertyValue}`
                        )
                    );
            } else {
                updatedQueryParams.push(`${contextKey}=${contextValue}`);
            }
        });

    // Combine existing and updated query parameters
    const allQueryParams = existingQueryParams.concat(updatedQueryParams);

    // Construct the final URL string
    const updatedUrl = baseUrl + (baseUrl.charAt(-1) === '/' ? '': '/') + (allQueryParams.length > 0 ? '?' + allQueryParams.join('&') : '');
    return updatedUrl;
};
