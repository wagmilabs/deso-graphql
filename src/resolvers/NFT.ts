import Users from '../datasource/Users';
import Posts from '../datasource/Posts';
import NFTs from '../datasource/NFTs';

const resolvers = {
  NFT: {
    Owner: async (parent, args, context) => {
      const users = await new Users().getSingleProfile(
        true,
        parent.OwnerPublicKeyBase58Check
      );

      return {
        ...users.Profile,
        IsBlacklisted: users.IsBlacklisted,
        IsGraylisted: users.IsGraylisted,
      };
    },
    Post: async (parent, args, context) => {
      const post = await new Posts().getSinglePost(parent.NFTHashHex);

      return post.PostFound;
    },
  },
  NFTCollectionSummary: {
    Owner: async (parent, args, context) => {
      const users = await new Users().getSingleProfile(
        true,
        parent.OwnerPublicKeyBase58Check
      );

      return {
        ...users.Profile,
        IsBlacklisted: users.IsBlacklisted,
        IsGraylisted: users.IsGraylisted,
      };
    },
    Post: async (parent, args, context) => {
      const post = await new Posts().getSinglePost(parent.NFTHashHex);

      return post.PostFound;
    },
  },
  Query: {
    getNFTCollectionSummary: async (parent, args, context) => {
      const collectionSummary = await new NFTs().getNFTCollectionSummary(
        args.input.NFTHashHex,
        ''
      );

      return {
        NFTHashHex:
          collectionSummary.NFTCollectionResponse.PostEntryResponse.PostHashHex,
        OwnerPublicKeyBase58Check:
          collectionSummary.NFTCollectionResponse.ProfileEntryResponse
            .PublicKeyBase58Check,
        HighestBidAmountNanos: `${collectionSummary.NFTCollectionResponse.HighestBidAmountNanos}`,
        LowestBidAmountNanos: `${collectionSummary.NFTCollectionResponse.LowestBidAmountNanos}`,
        HighestBuyNowPriceNanos: `${collectionSummary.NFTCollectionResponse.HighestBuyNowPriceNanos}`,
        LowestBuyNowPriceNanos: `${collectionSummary.NFTCollectionResponse.LowestBuyNowPriceNanos}`,
        NumCopiesForSale:
          collectionSummary.NFTCollectionResponse.NumCopiesForSale,
        NumCopiesBuyNow:
          collectionSummary.NFTCollectionResponse.NumCopiesBuyNow,
        AvailableSerialNumbers:
          collectionSummary.NFTCollectionResponse.AvailableSerialNumbers,
      };
    },
    doesUserHaveNFTFromCollection: async (parent, args, context) => {
      const nftCollection = await new Users().getSingleProfile(
        false,
        '',
        args.input.NFTCollectionName
      );

      const nftPublicKey = nftCollection?.Profile?.PublicKeyBase58Check;

      if (!nftPublicKey) {
        throw new Error('NFT owner not found');
      }

      const nfts = await new Users().getNFTsForUser(
        args.input.PublicKeyBase58Check,
        args.input.PublicKeyBase58Check,
        null, // Important to pass null here, otherwise it will return only non-listed NFTs
        false
      );

      const nftArray = [];
      Object.keys(nfts.NFTsMap).forEach((k) => {
        nfts.NFTsMap[k].NFTEntryResponses.forEach((NFTEntryResponse) => {
          nftArray.push({
            NFTHashHex: k,
            ...NFTEntryResponse,
            ProfileEntryResponse:
              nfts.NFTsMap[k].PostEntryResponse.ProfileEntryResponse,
          });
        });
      });

      return !!nftArray.filter(
        (nft) => nft.ProfileEntryResponse.PublicKeyBase58Check === nftPublicKey
      ).length;
    },
  },
};

export { resolvers };
