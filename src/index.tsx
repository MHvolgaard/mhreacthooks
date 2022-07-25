import * as React from 'react';

export function usePrevious(value: any) {
	const currentRef = React.useRef(value);
	const previousRef = React.useRef();

	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}

	return previousRef.current;
};

export function useEventListener(eventType: string, callback: Function, element: any = window) {
	const callbackRef = React.useRef(callback);

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	React.useEffect(() => {
		if (element == null) return;
		const handler = (e: any) => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
};

export function useTimeout(callback: Function, delay: number) {
	const callbackRef = React.useRef(callback);
	const timeoutRef = React.useRef<any>();

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = React.useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = React.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);

	React.useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = React.useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
};

export function useDebounce(callback: Function, delay: number, dependencies: any[]) {
	const { reset, clear } = useTimeout(callback, delay);
	React.useEffect(reset, [...dependencies, reset]);
	React.useEffect(clear, []);
};

export function useAsync(callback: Function, dependencies: any[] = []) {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState();
	const [value, setValue] = React.useState();

	const callbackMemoized = React.useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, dependencies);

	React.useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return [loading, error, value];
};

export function useClipboard() {
	const [copiedText, setCopiedText] = React.useState<any>(null);

	const copy = async (text: string) => {
		if (!navigator?.clipboard) {
			console.warn('Clipboard not supported');
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn('Copy failed', error);
			setCopiedText(null);
			return false;
		}
	};
	return [copiedText, copy];
};

export function useClickOutside(ref: React.RefObject<any>, callback: Function) {
	useEventListener("click", (e: any) => {
		if (ref.current == null || ref.current.contains(e.target)) return;
		callback(e);
	}, document);
};

export function useUpdateEffect(callback: Function, dependencies: any[] = []) {
	const firstRenderRef = React.useRef(true);

	React.useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, dependencies);
};