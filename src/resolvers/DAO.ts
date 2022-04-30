import DAOs from '../datasource/DAOs';

const cleanHoldings = (holdings) => {
  return holdings.map((h) => ({
    CreatorPublicKeyBase58Check: h.CreatorPublicKeyBase58Check,
    HasPurchased: h.HasPurchased,
    BalanceNanos: h.BalanceNanos,
    BalanceNanosUint256: h.BalanceNanosUint256,
    NetBalanceInMempool: h.NetBalanceInMempool,
  }));
};

const resolvers = {
  Query: {
    doesUserOwnDAOCoins: async (parent, args, context) => {
      let holdings = [];
      const daoCoins = await new DAOs().getDAOHoldingsForPublicKey(
        args.input.PublicKeyBase58Check
      );

      holdings = holdings.concat(cleanHoldings(daoCoins.Hodlers));

      // Paginate through holdings to make sure we have all of them
      // We do this by checking the LastPublicKeyBase58Check field against the last PublicKeyBase58Check in the Hodlers array
      let response = {
        Hodlers: [],
        LastPublicKeyBase58Check: daoCoins.LastPublicKeyBase58Check,
      };
      while (
        response.LastPublicKeyBase58Check !==
        holdings[holdings.length - 1].CreatorPublicKeyBase58Check
      ) {
        response = await new DAOs().getDAOHoldingsForPublicKey(
          args.input.DAOPublicKeyBase58Check,
          daoCoins.Hodlers.LastPublicKeyBase58Check
        );

        holdings = holdings.concat(cleanHoldings(response.Hodlers));
      }

      if (args.input.MinHoldingNanos) {
        holdings = holdings.filter(
          (h) => h.BalanceNanos >= args.input.MinHoldingNanos
        );
      }

      return !!holdings.filter(
        (h) =>
          h.CreatorPublicKeyBase58Check === args.input.DAOPublicKeyBase58Check
      ).length;
    },
  },
};

export { resolvers };
