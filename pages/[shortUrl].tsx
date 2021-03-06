import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { Box, Button, Heading, HStack, Icon, Text, VStack, Image, useColorModeValue } from "@chakra-ui/react";
import { whiteOrBlack } from "../components/functions/whiteOrBlack";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";
import { AiFillLinkedin, AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import useProgressiveImage from "../components/hooks/useProgressiveImage";
import { buildImageUrl } from "cloudinary-build-url";

interface Params extends ParsedUrlQuery {
	shortUrl: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { shortUrl } = ctx.params as Params;

	let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/links/?filters[shortUrl][$eq]=${shortUrl}`);

	const url = data?.data[0];

	if (url) {
		return {
			redirect: {
				destination: url.attributes.longUrl,
			},
		};
	} else {
		let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/microsites/?filters[shortUrl][$eq]=${shortUrl}`);

		const microsite = data?.data[0]?.attributes;

		if (microsite) {
			return {
				props: {
					...microsite,
				},
			};
		}

		return {
			redirect: {
				destination: "/",
			},
		};
	}
};

interface MicrositeDataProps {
	displayName: string;
	background: string;
	description: string | null;
	facebookLink: string | null;
	facebookUser: string | null;
	instagramLink: string | null;
	instagramUser: string | null;
	tiktokLink: string | null;
	tiktokUser: string | null;
	youtubeLink: string | null;
	youtubeUser: string | null;
	twitterUser: string | null;
	twitterLink: string | null;
	linkedInUser: string | null;
	linkedInLink: string | null;
	size: "sm" | "md" | "lg";
	selectedStyle: "full" | "2xl" | "xl" | "lg" | "md" | "sm";
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	shortUrl: string;
	imageUrl: string;
}

const ShortURL: React.FC<MicrositeDataProps> = ({
	displayName,
	background,
	description,
	facebookLink,
	facebookUser,
	instagramLink,
	instagramUser,
	tiktokLink,
	tiktokUser,
	youtubeLink,
	youtubeUser,
	twitterLink,
	twitterUser,
	linkedInLink,
	linkedInUser,
	size,
	selectedStyle,
	imageUrl,
}) => {
	const socials = [
		{
			name: facebookUser,
			link: facebookLink,
			icon: FaFacebookSquare,
		},
		{
			name: instagramUser,
			link: instagramLink,
			icon: AiOutlineInstagram,
		},
		{
			name: tiktokUser,
			link: tiktokLink,
			icon: FaTiktok,
		},
		{
			name: youtubeUser,
			link: youtubeLink,
			icon: AiOutlineYoutube,
		},
		{
			name: twitterUser,
			link: twitterLink,
			icon: AiOutlineTwitter,
		},
		{
			name: linkedInUser,
			link: linkedInLink,
			icon: AiFillLinkedin,
		},
	];

	const profileColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

	const publicId = imageUrl;
	const lowSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName: "steven2801",
		},
		transformations: {
			quality: 1,
		},
	});

	const highSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName: "steven2801",
		},
	});

	const [src, blur] = useProgressiveImage(lowSrc, highSrc);

	const iconSizes = {
		sm: 4,
		md: 6,
		lg: 8,
	};

	const paddings = {
		text: {
			sm: 10,
			md: 12,
			lg: 16,
		},
		icon: {
			sm: 4,
			md: 4,
			lg: 5,
		},
	};

	return (
		<>
			<Head>
				<title>{displayName} - Microsite</title>
			</Head>
			<VStack w="full" minH="70vh" justifyContent="center">
				<VStack pb={8} spacing={4}>
					<Box
						overflow="hidden"
						position="relative"
						bg={profileColor}
						w={{ base: 12, sm: 16 }}
						h={{ base: 12, sm: 16 }}
						rounded="lg"
					>
						{imageUrl !== "" && (
							// eslint-disable-next-line jsx-a11y/alt-text
							<Image
								position="absolute"
								src={src}
								boxSize={{ base: 12, sm: 16 }}
								alt="profile image"
								objectFit="cover"
								objectPosition="center"
								style={{
									filter: blur ? "blur(20px)" : "none",
									transition: blur ? "none" : "filter 0.3s ease-out",
								}}
							/>
						)}
					</Box>
					<Heading size="md" fontWeight="medium">
						{displayName}
					</Heading>
					<Text fontSize="sm" textAlign="center">
						{description}
					</Text>
				</VStack>
				<VStack spacing={4} w="full">
					{socials.map((social, index) => {
						if (social.name === null || social.link === null) {
							return;
						}
						return (
							<HStack
								as="a"
								href={social.link}
								justifyContent="center"
								target="_blank"
								rel="noreferrer"
								key={index}
								w="full"
							>
								<Button
									flex={1}
									maxW="300px"
									rounded={selectedStyle}
									bg={background}
									_hover={{ bg: background, opacity: 0.9 }}
									_active={{ bg: background, opacity: 0.8 }}
									size={size}
									p={4}
									color={whiteOrBlack(background)}
									overflow="hidden"
									position="relative"
									justifyContent="flex-start"
									alignItems="center"
									pl={paddings.text[size]}
									pr={8}
								>
									<Icon
										position="absolute"
										left={paddings.icon[size]}
										as={social.icon}
										w={iconSizes[size]}
										h={iconSizes[size]}
									/>
									<Text w="full" noOfLines={1}>
										@{social.name}
									</Text>
								</Button>
							</HStack>
						);
					})}
				</VStack>
			</VStack>
		</>
	);
};

export default ShortURL;
