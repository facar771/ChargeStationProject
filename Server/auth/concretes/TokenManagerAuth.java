package station.chargeStation.auth.concretes;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import station.chargeStation.auth.abstracts.TokenServiceAuth;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class TokenManagerAuth implements TokenServiceAuth {
	
	//private static final String SECRET_KEY = "LpMg8i@t8$#jH$a2"; // Güçlü bir anahtar oluşturmak için bunu kullanmayacağız
    private static final long EXPIRATION_TIME = 86400000; // Token'ın geçerlilik süresi (1 gün)

    public String generateToken(int userId, String role) {
        // Güçlü bir anahtar oluşturmak için secretKeyFor() yöntemini kullanıyoruz
        byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
        
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // Kullanıcı kimliği
                .claim("role", role) // Kullanıcı rolü
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Token'ın süresi sonu
                .signWith(Keys.hmacShaKeyFor(keyBytes)) // Token'ın imzalanması
                .compact();
    }
}
