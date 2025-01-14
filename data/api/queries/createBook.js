const CREATE_BOOK = `
  mutation CreateNewBook($bookInput: BookInput!) {
    createBook(input: $bookInput) {
      data {
        id
        title
        author
        genre
        publishedYear
        tags
        ratings {
          userId
          score
          review
          dateRated
        }
        averageRating
        isAvailable
        publisher {
          id
          name
          country
        }
        metadata {
          isbn
          edition
          language
          format
          pageCount
        }
        pricing {
          retailPrice
          discount
          finalPrice
          currency
        }
        lastUpdated
        modifiedBy
      }
      error {
        message
        code
        field
      }
    }
  }
`;

module.exports = { CREATE_BOOK };