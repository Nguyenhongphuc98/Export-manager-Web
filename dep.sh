git pull https://nguyenhongphuc98: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@github.com/Nguyenhongphuc98/Export-manager-Web.git
docker build -t em-web .
docker run -p 8081:3000 em-web