package io.kamaal.ColorSelector

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import io.kamaal.ColorSelector.ui.theme.ColorSelectorTheme
import androidx.compose.material.Text
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ContentView()
        }
    }
}

@Composable
fun ContentView() {
    ColorSelectorTheme {
        Surface(color = MaterialTheme.colors.background) {
            Column(modifier = Modifier.padding(horizontal = 40.dp, vertical = 40.dp)) {
                PreviewBox(color = Color.Red)
                Column(modifier = Modifier.padding(horizontal = 8.dp)) {
                    TitleValue(title = "Name", value = "Red", modifier = Modifier.padding(top = 8.dp))
                }
            }
        }
    }
}

@Composable
fun TitleValue(title: String, value: String, modifier: Modifier = Modifier) {
    Row(modifier = modifier.padding(vertical = 4.dp)) {
        Text(text = title, fontWeight = FontWeight.SemiBold, fontSize = 17.sp)
        Text(text = value, modifier = Modifier.padding(horizontal = 12.dp))
    }
}

@Composable
fun PreviewBox(color: Color, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .height(120.dp)
            .fillMaxWidth()
            .clip(RoundedCornerShape(12))
            .background(color = color)
    )
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    ContentView()
}