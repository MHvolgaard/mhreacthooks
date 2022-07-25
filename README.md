# mhreacthooks

### A collection af custom react hooks.

## Usage

### usePrevious
```tsx
import * as React from 'react'

import { usePrevious } from 'mhreacthooks'

const Example = () => {
	const [count, setCount] = React.useState(0)
	const prevCount = usePrevious(count)
	return <>
		<div>
			{count}
		</div>
		<div>
			{prevCount}
		</div>
	</>
}
```

### useEventListener
```tsx
import * as React from 'react'

import { useEventListener } from 'mhreacthooks'

const Example = () => {
	const [key, setKey] = React.useState("")
	useEventListener("keydown", e => {
		setKey(e.key)
	})
	return <div>Last Key: {key}</div>
}
```

### useTimeout
```tsx
import * as React from 'react'

import { useTimeout } from 'mhreacthooks'

const Example = () => {
	const [count, setCount] = React.useState(10)
	const { clear, reset } = useTimeout(() => setCount(0), 1000)
	return <>
		<div>{count}</div>
		<button onClick={() => setCount(c => c + 1)}>Increment</button>
		<button onClick={clear}>Clear Timeout</button>
		<button onClick={reset}>Reset Timeout</button>
	</>
}
```

### useDebounce
```tsx
import * as React from 'react'

import { useDebounce } from 'mhreacthooks'

const Example = () => {
	const [count, setCount] = React.useState(10)
	useDebounce(() => alert(count), 1000, [count])

	return <>
		<div>{count}</div>
		<button onClick={() => setCount(c => c + 1)}>Increment</button>
	</>
}
```

### useAsync
```tsx
import * as React from 'react'

import { useAsync } from 'mhreacthooks'

const Example = () => {
	const { loading, error, value } = useAsync(() => {
		return new Promise((resolve, reject) => {
			const success = false
			setTimeout(() => {
				success ? resolve("Success") : reject("Error")
			}, 1000)
		})
	})

	return <>
		<div>Loading: {loading.toString()}</div>
		<div>{error}</div>
		<div>{value}</div>
	</>
}
```

### useCopyToClipboard
```tsx
import * as React from 'react'

import { useCopyToClipboard } from 'mhreacthooks'

const Example = () => {
	const [value, copy] = useClipboard()
	return <>
		<h1>Click to copy:</h1>
		<div style={{ display: 'flex' }}>
			<button onClick={() => copy('A')}>A</button>
			<button onClick={() => copy('B')}>B</button>
			<button onClick={() => copy('C')}>C</button>
		</div>
		<p>Copied value: {value ?? 'Nothing is copied yet!'}</p>
	</>
}
```

### useClickOutside
```tsx
import * as React from 'react'

import { useClickOutside } from 'mhreacthooks'

const Example = () => {
	const [open, setOpen] = React.useState(false)
	const modalRef = React.useRef<HTMLDivElement>(null)

	useClickOutside(modalRef, () => {
		if (open) setOpen(false)
	})

	return <>
		<button onClick={() => setOpen(true)}>Open</button>
		{open &&
			<div
				ref={modalRef}
				style={{
					backgroundColor: "blue",
					color: "white",
					width: "100px",
					height: "100px",
					position: "absolute",
					top: "calc(50% - 50px)",
					left: "calc(50% - 50px)",
				}}
			>
				<span>Modal</span>
			</div>
		}
	</>
}
```

### useUpdateEffect
```tsx
import * as React from 'react'

import { useUpdateEffect } from 'mhreacthooks'

const Example = () => {
	const [count, setCount] = React.useState(10)
	useUpdateEffect(() => alert(count), [count])

	return <>
		<div>{count}</div>
		<button onClick={() => setCount(c => c + 1)}>Increment</button>
	</>
}
```

---