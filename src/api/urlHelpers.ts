// Auth
export const adminUrl = () => '/admin/auth';
export const authUrl = () => '/auth';

// Config
export const adminConfigUrl = () => '/admin/config';

// Users
export const adminUsersUrl = (payload?: Record<string, any>) => {
    const baseUrl = "/admin/users";

    if (!payload || Object.keys(payload).length === 0) {
        return baseUrl;
    }

    const query = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value));
        }
    });

    return `${baseUrl}?${query.toString()}`;
};
