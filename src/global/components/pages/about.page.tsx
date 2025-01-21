import { oneBg, threeTx } from "@/global/styles/app.css";
import { Center, Divider, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { SeoComponent } from "../components";
import { mainContentWidth } from "@/global/styles/global.styles";

export const AboutPage = () => {
  return (
    <Stack h="100%" bg={oneBg}>
      <SeoComponent
        title="PackageHub | About Page"
        description="Learn more about Qool Quotes."
      />

      <ScrollArea scrollbarSize={2}>
        <Center>
          <Stack p="md" gap="lg" maw={mainContentWidth}>
            <Center>
              <Title order={2}>About</Title>
            </Center>

            <Text>
              Welcome to QoolQuotes, a creative platform designed for quote
              enthusiasts and aspiring curators of inspiration. Our app allows
              users to explore, organize, and share their favorite quotes with a
              seamless and personalized experience. Whether you’re seeking daily
              motivation, curating your thoughts, or simply connecting with
              others who share your love for profound words, our app is the
              perfect tool for you.
            </Text>

            <Center>
              <Title order={3}>What You Can Do</Title>
            </Center>

            <Title order={4}>Discover and Explore</Title>

            <Stack gap={0}>
              <Title order={5}>1. Browse Quotes by Author or Topic</Title>
              <Text>
                Easily find quotes by your favorite authors or dive into
                specific topics that resonate with your current mood or
                interests.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>2. Search and Filter</Title>
              <Text>
                Use our intuitive search and filter options to quickly locate
                quotes that speak to you.
              </Text>
            </Stack>

            <Title order={4}>Create and Personalize Playlists</Title>

            <Stack gap={0}>
              <Title order={5}>3. Build Your Playlists</Title>
              <Text>
                Create themed playlists by adding your favorite quotes, giving
                each collection a unique name and identity.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>4. Clone and Customize</Title>
              <Text>
                Found a playlist you adore? Clone it and make it your own by
                adding or removing quotes.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>5. Save and Organize</Title>
              <Text>
                Save playlists for future inspiration or easy access to your
                favorite collections.
              </Text>
            </Stack>

            <Title order={4}>Connect and Share</Title>

            <Stack gap={0}>
              <Title order={5}>6. Like and Appreciate</Title>
              <Text>
                Show your support by liking quotes and playlists, helping great
                content rise to prominence.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>7. Share with the World</Title>
              <Text>
                Share your curated playlists with friends, family, or a wider
                audience through social media or direct links.
              </Text>
            </Stack>

            <Title order={4}>Customize Your Experience</Title>

            <Stack gap={0}>
              <Title order={5}>8. Switch Between Light and Dark Modes</Title>
              <Text>
                Optimize for comfort with a simple toggle between light and dark
                themes.
              </Text>
            </Stack>

            <Center>
              <Title order={3}>Why Choose Our App?</Title>
            </Center>

            <Title order={4}>Seamless User Experience</Title>

            <Text>
              Our app is designed with you in mind, offering a sleek,
              user-friendly interface that works flawlessly across devices. As a
              Progressive Web App (PWA), it provides the convenience of
              accessing your favorite features on the go, whether you're using
              your phone, tablet, or desktop.
            </Text>

            <Title order={4}>Community-Centered</Title>

            <Text>
              Join a community of quote lovers! Share your curated playlists,
              discover hidden gems from others, and connect through shared
              inspiration.
            </Text>

            <Title order={4}>Built for Flexibility</Title>

            <Text>
              Whether you’re creating a personal archive of favorite quotes or
              sharing playlists to inspire others, our app gives you the tools
              to express yourself and spread positivity.
            </Text>

            <Divider my="xs" />

            <Center>
              <Text fs="italic" c={threeTx} size="xs">
                Emoji artwork provided by OpenMoji – the open-source emoji
                project. License: CC BY-SA 4.0
              </Text>
            </Center>
          </Stack>
        </Center>
      </ScrollArea>
    </Stack>
  );
};
