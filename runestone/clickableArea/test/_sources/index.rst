Clickable Area
--------------

.. clickablearea:: click1
    :question: Click on all assignment statements.
    :iscode:
    :feedback: Remember, the operator '=' is used for assignment.

    :click-incorrect:def main()::endclick:
        :click-correct:x = 4:endclick:
        for i in range(5):
            :click-correct:y = i:endclick:
            :click-incorrect:if y > 2::endclick:
                print(y)