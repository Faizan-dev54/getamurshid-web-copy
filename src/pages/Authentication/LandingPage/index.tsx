import { Link } from "react-router-dom";
import { useLandingController } from "./useController";
import {
	Button,
	Card,
	CardHeader,
	CardBody,

} from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";




export default function Landing() {
	useLandingController();

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
			<Header />

			<section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
						Connect with Your
						<br />
						<span className="bg-gradient-to-r from-[#F87060] via-[#F08CA8] to-[#BA81FF] bg-clip-text text-transparent">
							True Murshid
						</span>
					</h1>

					<p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
						A modern platform designed for fans and experts to connect, learn, inspire,
						and grow through meaningful conversations and mentorship.
					</p>

					<div className="mt-7 flex gap-4">
						<Button
							as={Link}
							to="/auth"
							color="primary"
							radius="lg"
							size="lg"
							endContent={<ArrowRight size={18} />}
						>
							Get Started
						</Button>

						<Button
							as={Link}
							to="#features"
							variant="bordered"
							radius="lg"
							size="lg"
						>
							Learn More
						</Button>
					</div>

					<p className="mt-4 text-xs text-gray-500">
						© {new Date().getFullYear()} GetAMurshid — All rights reserved.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="relative"
				>
					<div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50  flex items-center justify-center shadow-sm">
						<img
							src="/logo.svg"
							alt="GetAMurshid"
							className="h-56 w-56 opacity-90"
						/>
					</div>
				</motion.div>
			</section>

			<section id="features" className="pb-20 px-4 max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl font-bold text-center mb-12"
				>
					Why Choose GetAMurshid?
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[{
						icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />,
						title: "Secure & Private",
						desc: "Your conversations and data are protected with top-tier security.",
					},
					{
						icon: <Zap className="w-10 h-10 text-indigo-600" />,
						title: "Fast & Optimized",
						desc: "Built using modern stacks ensuring blazing fast performance.",
					},
					{
						icon: <Layers className="w-10 h-10 text-indigo-600" />,
						title: "Scalable System",
						desc: "Designed to grow with your audience and content.",
					}].map((f) => (
						<Card key={f.title} shadow="sm" radius="lg" className="py-6 px-4">
							<CardHeader className="flex flex-col items-center gap-4">
								{f.icon}
								<h3 className="text-xl font-semibold text-center">{f.title}</h3>
							</CardHeader>
							<CardBody>
								<p className="text-gray-600 text-center leading-relaxed">{f.desc}</p>
							</CardBody>
						</Card>
					))}
				</div>
			</section>

			<section className="bg-white  py-20 px-4">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-4xl font-bold leading-tight mb-4">A New Way to Connect</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							Whether you’re a fan looking for guidance or an expert looking to help
							people, GetAMurshid brings everyone together on one seamless platform.
						</p>
						<p className="text-gray-600 leading-relaxed mb-4">
							Book sessions, explore expert profiles, review policies, and get access
							to verified community mentors — all built with top‑notch UI and
							reliable infrastructure.
						</p>
						<Button color="primary" radius="lg" size="lg">
							Discover More
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="rounded-3xl bg-gradient-to-tr from-[#FDE8E4] via-[#EFE7FF] to-[#E9F1FF] p-10 shadow-lg "
					>
						<h3 className="text-2xl font-semibold mb-4">What You Can Do</h3>
						<ul className="space-y-3 text-gray-700">
							<li>• Explore experts across multiple fields</li>
							<li>• Book voice / video sessions</li>
							<li>• Browse FAQs and policies</li>
							<li>• View trending consultations</li>
							<li>• Review expert profiles and feedback</li>
						</ul>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
