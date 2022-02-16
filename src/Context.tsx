import { useState, useEffect, createContext } from 'react'
import { IPuzzleObject, IUserObject, IPuzzleContext, IPuzzleProvider, ICleanedPuzzleObject } from './interfaces'

const PuzzleContext = createContext({} as IPuzzleContext);

const PuzzleProvider = ({ children }: IPuzzleProvider) => {
	const [puzzles, setPuzzles] = useState<ICleanedPuzzleObject[]>([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState({
		id: '',
		username: '',
		puzzles: [],
		sentRequests: [],
		receivedRequests: []
	} as IUserObject);

	const fetchPuzzles = async () => {
		try {
			const puzzleData = await fetch('https://puzzlrs.herokuapp.com/api/v1/puzzles')
			const { data } = await puzzleData.json()
			setPuzzles(data.map((puzzle: IPuzzleObject) => {
				return {
					id: puzzle.id,
					image: puzzle.attributes.image,
					category: puzzle.attributes.category,
					pieceCount: puzzle.attributes.piece_count,
					missingPieces: puzzle.attributes.missing_pieces,
					availability: puzzle.attributes.availability,
					quality: puzzle.attributes.quality,
					price: puzzle.attributes.original_price_point
				}
			}))
		} catch (err) {
			console.log(err)
		}
	}

	const fetchUser = async (id: string) => {
		if (id) {
			try {
				const userData = await fetch(`https://puzzlrs.herokuapp.com/api/v1/users/${id}`)
				const { data } = await userData.json()
				const userDetails: IUserObject = {
					id: data.id,
					username: data.attributes.username,
					puzzles: data.attributes.puzzles,
					sentRequests: data.attributes.sent_requests,
					receivedRequests: data.attributes.received_requests
				}
				console.log(userDetails)
				setUser(userDetails)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const requestPuzzle = async (puzzleId: string | number) => {
		const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: user.id,
				puzzle_id: puzzleId
			})
		})
		const { data } = await res.json()
		console.log(data)
	}

	const updatePuzzleStatus = async (status: string, requestID: number | undefined) => {
		try {
			const res = await fetch('https://puzzlrs.herokuapp.com/api/v1/requests/' + requestID, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: status
				})
			})
			const { data } = await res.json()
			refreshData(user.id)
		} catch(err) {
			console.log(err)
		}
	}

	const logIn = (userId: string) => {
		fetchUser(userId)
		setLoggedIn(true)
	}

	const refreshData = (id: string) => {
		fetchPuzzles()
		fetchUser(id)
	}

	useEffect(() => {
		refreshData(user.id)
	}, [])

	// useEffect(() => {
	// 		localStorage.setItem("savedUser", JSON.stringify(user))
	// }, [user])


	return (
		<PuzzleContext.Provider value={{ refreshData, puzzles, loggedIn, logIn, user, requestPuzzle, updatePuzzleStatus }}>
			{children}
		</PuzzleContext.Provider>
	)
}

export { PuzzleContext, PuzzleProvider }