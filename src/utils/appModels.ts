export interface CommonPayload<T = any> {
	payload?: T;
	onSuccess?: (response: any) => void;
	onError?: (error: any) => void;
}


