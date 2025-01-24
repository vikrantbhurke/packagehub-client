import { oneBg, threeTx, twoBg } from "@/global/styles/app.css";
import { Center, Divider, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { SeoComponent } from "../components";
import { aboutContentWidth } from "@/global/styles/global.styles";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

export const AboutPage = () => {
  const { isMobile } = useSelector((state: RootState) => state.view);

  return (
    <Stack h="100%" bg={isMobile ? oneBg : twoBg}>
      <SeoComponent
        title="PackageHub | About Page"
        description="Learn more about Qool Quotes."
      />

      <ScrollArea scrollbarSize={2}>
        <Center>
          <Stack p="md" gap="lg" maw={aboutContentWidth}>
            <Center>
              <Title order={2}>About</Title>
            </Center>

            <Text>
              Welcome to PackageHub, the ultimate destination for developers,
              tech enthusiasts, and open-source aficionados! Our platform
              empowers users to discover, evaluate, and share their experiences
              with open-source packages from a wide range of registries. Whether
              you’re hunting for the perfect library, sharing your insights, or
              simply exploring the vast ecosystem of open-source tools,
              PackageHub is your go-to hub for informed decisions and
              community-driven recommendations.
            </Text>

            <Center>
              <Title order={3}>What You Can Do</Title>
            </Center>

            <Title order={4}>Discover and Explore</Title>

            <Stack gap={0}>
              <Title order={5}>1. Search Across Multiple Registries</Title>
              <Text>
                Find packages seamlessly from registries like Npm, PyPI, Maven,
                RubyGems, Crates, Go, NuGet, and Packagist.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>2. Filter and Sort Packages</Title>
              <Text>
                Easily browse reviews and packages by highest rating, most
                helpful feedback, or recency.
              </Text>
            </Stack>

            <Title order={4}>Rate and Review</Title>

            <Stack gap={0}>
              <Title order={5}>3. Give Star Ratings</Title>
              <Text>
                Rate packages based on your experience, helping others quickly
                identify high-quality tools.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>4. Write Detailed Reviews</Title>
              <Text>
                Share your insights, use cases, and opinions to guide the
                community in making informed choices.
              </Text>
            </Stack>

            <Stack gap={0}>
              <Title order={5}>5. Upvote or Downvote Reviews</Title>
              <Text>
                Engage with the community by supporting helpful reviews or
                flagging less relevant ones.
              </Text>
            </Stack>

            <Center>
              <Title order={3}>Why Choose Our App?</Title>
            </Center>

            <Title order={4}>Comprehensive Coverage</Title>

            <Text>
              With support for multiple registries, PackageHub offers an
              unparalleled breadth of open-source package discovery.
            </Text>

            <Title order={4}>Community-Driven Insights</Title>

            <Text>
              Benefit from honest, insightful reviews and ratings from
              developers like you who’ve worked with these tools.
            </Text>

            <Title order={4}>Built by Developers, for Developers</Title>

            <Text>
              We understand your needs because we’re developers too. From
              searching for the right library to sharing your thoughts,
              PackageHub is designed to make your journey smooth, insightful,
              and impactful. Join PackageHub today and become part of a global
              community transforming how we discover, review, and connect with
              open-source software!
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
