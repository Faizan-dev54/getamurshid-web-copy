import { useCreatorHomeController } from './useController';

export default function CreatorHome() {
	const { onSignOut } = useCreatorHomeController();

	return (
		<div className="min-h-screen p-6 justify-center">
			<h6 className="text-3xl font-bold mb-4 text-black">Creator Dashboard</h6>
			
			<button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={onSignOut}>
				Sign Out
			</button>
		</div>
	);
}


