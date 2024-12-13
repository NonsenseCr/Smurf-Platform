from flask import Flask,render_template,request, jsonify
import pickle
import numpy as np
# from flask_cors import CORS

app = Flask(__name__)

# load dữ liệu
# popular_df = pickle.load(open('popular.pkl','rb'))
pt = pickle.load(open('book-recommender-system/pt.pkl','rb'))
books = pickle.load(open('book-recommender-system/books.pkl','rb'))
similarity_scores = pickle.load(open('book-recommender-system/similarity_scores.pkl','rb'))


def recommend(book_id):
    book_id = str(book_id)  # Chuyển ObjectId sang chuỗi 

    if book_id in pt.index:
        index = np.where(pt.index == book_id)[0][0]
        similar_items = sorted(
            enumerate(similarity_scores[index]), key=lambda x: x[1], reverse=True
        )[1:5]

        data = []
        for i in similar_items:
            item = []
            temp_df = books[books['Book-Id'] == pt.index[i[0]]]
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Id'].values))

            data.append(item)
        
        return data
    
    else:
        print ("Book not found")
        return None
    

@app.route('/goi-y-sach', methods=['POST'])
def goi_y_sach():
    if not request.is_json:
        return jsonify({"status": 400, "message": "Request must be in JSON format"}), 400

    data = request.get_json()
    book_id = data.get('Book-Id')
    sach_duocgoiy = data.get('recommended_bookId');

    if not book_id:
        return jsonify({"status": 400, "message": "'Book-Id' key not found in request"}), 400

    try:
        recommended_books = recommend(book_id)
        # Chuyển đổi recommended_books thành đối tượng JSON, chuyển các giá trị thành một mảng
        recommended_books_array = [item for sublist in recommended_books for item in sublist]
        print(recommended_books_array)
        if recommended_books:
            return jsonify({"status": 200, "recommended_books": recommended_books_array}), 200

        return jsonify({"status": 400, "message": "Book ID not found"}), 400

    except Exception as e:
        return jsonify({"status": 400, "message": f"An error occurred: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)